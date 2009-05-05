ActionController::Routing::Routes.draw do |map|
  map.resources :projects, :collection => { :language_form => :get }

  map.root :controller => "projects", :action => "new"
end
