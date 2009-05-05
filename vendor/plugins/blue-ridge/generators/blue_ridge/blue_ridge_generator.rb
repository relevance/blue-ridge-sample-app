class BlueRidgeGenerator < Rails::Generator::Base
  def manifest
    record do |m|
      m.directory base_dir
      m.file 'application_spec.js', "#{base_dir}/application_spec.js"
      m.file 'spec_helper.js',      "#{base_dir}/spec_helper.js"
      
      m.directory "#{base_dir}/fixtures"
      m.file 'application.html', "#{base_dir}/fixtures/application.html"
      m.file 'screw.css',        "#{base_dir}/fixtures/screw.css"
    end
  end

  def base_dir
    @base_dir ||= File.exist?("examples") ? "examples/javascripts" : File.exist?("spec") ? "spec/javascripts" : "test/javascript"
  end

end
