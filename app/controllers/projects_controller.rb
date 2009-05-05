class ProjectsController < ApplicationController
  def new
    @project = Project.new
  end
  
  def language_form
    render :partial => "language_form"
  end
end
