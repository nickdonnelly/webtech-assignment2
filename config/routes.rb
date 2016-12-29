Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'api#no_endpoint_error'

  # Exception routes should go to no endpoint
  get '404', :to => 'api#invalid_path_error'

  # API routes
  scope '/api' do #base path
    get '/' => 'api#no_revision_error'
    post '/' => 'api#no_revision_error'
    scope '/revision1' do
      get '/' => 'api#no_endpoint_error'
      post '/' => 'api#no_endpoint_error'
      scope '/quote' do
        get '/' => 'api#get_quote'
        get '/:n' => 'api#get_multi_quote'
      end
      scope '/image' do
        get '/' => 'api#get_trump_image'
      end
      scope '/image/:win' do
        get '/' => 'api#get_trump_image'
      end
      get '/endgame' => 'api#invalid_request_error'
      scope '/endgame/:rightcount' do
        get '/' => 'api#get_endgame_quote'
      end
    end
  end
end
