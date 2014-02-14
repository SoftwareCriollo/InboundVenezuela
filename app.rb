require 'rubygems'
require 'sinatra/base'
require 'slim'
require 'sass'
require 'mongoid'



RACK_ENV = "development"
Mongoid.load!("config/mongoid.yml")
Slim::Engine.set_default_options :sections => false

this_dir = Pathname.new(File.dirname(__FILE__))
['models/**/*', 'observers/**/*'].each do |dir_path|
  Dir[dir_path].each { |file_name| require this_dir + "./#{file_name}"}
end

class App < Sinatra::Base

  set :public, File.join(File.dirname(__FILE__), 'public')
  set :views, File.join(File.dirname(__FILE__), 'views')
  set :environment, :development
  helpers do
    def partial(page, options={})
      haml page, options.merge!(:layout => false)
    end
  end


  get('/') do 
    slim :index
  end

  get('/styles') do 
    slim :styles
  end
  
  get('/grid') do 
    slim :grid
  end

  get('/slider') do 
    slim :slider
  end
  get('/buttons') do 
    slim :buttons
  end

  post('/vote/') do
     Vote.create(:ip => request.ip.to_s)
     Vote.vote_count.to_s
  end

end
