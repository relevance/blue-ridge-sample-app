plugin_prefix = "#{RAILS_ROOT}/vendor/plugins/blue-ridge"
rhino_command = "java -jar #{plugin_prefix}/lib/js.jar -w -debug"
test_runner_command = "#{rhino_command} #{plugin_prefix}/lib/test_runner.js"

def find_base_dir
  target_dirs = ["test/javascript", "spec/javascripts", "examples/javascripts"]
  base_dir = target_dirs.find {|d| File.exist?(d) }
  raise "Could not find JavaScript test directory.\nNone of the following directories existed: #{target_dirs.join(", ")}.\nMaybe you need to call './script/generate blue_ridge'?" unless base_dir
  base_dir
end

# Support Test::Unit & Test/Spec style
namespace :test do
  desc "Runs all the JavaScript tests and outputs the results"
  task :javascripts do
    Dir.chdir(find_base_dir) do
      all_fine = true
      if ENV["TEST"]
        all_fine = false unless system("#{test_runner_command} #{ENV["TEST"]}_spec.js")
      else
        Dir.glob("**/*_spec.js").each do |file|
          all_fine = false unless system("#{test_runner_command} #{file}")
        end
      end
      raise "JavaScript test failures" unless all_fine
    end
  end
  
  task :javascript => :javascripts
end

# Support RSpec style
namespace :spec do
  task :javascripts => ["test:javascripts"]
  task :javascript =>  ["test:javascripts"]
end

# Support Micronaut style
namespace :examples do
  task :javascripts => ["test:javascripts"]
  task :javascript =>  ["test:javascripts"]
end


namespace :js do
  task :fixtures do
    fixture_dir = "#{RAILS_ROOT}/#{find_base_dir}/fixtures"
    
    if PLATFORM[/darwin/]
      system("open #{fixture_dir}")
    elsif PLATFORM[/linux/]
      system("firefox #{fixture_dir}")
    else
      puts "You can run your in-browser fixtures from #{fixture_dir}."
    end
  end
  
  task :shell do
    rlwrap = `which rlwrap`.chomp
    system("#{rlwrap} #{rhino_command} -f #{plugin_prefix}/lib/shell.js -f -")
  end
end