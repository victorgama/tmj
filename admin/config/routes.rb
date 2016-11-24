Rails.application.routes.draw do
  resources :cards do
    collection do
      post :accept
      post :reject
    end
  end

  root 'dashboard#index'
end
