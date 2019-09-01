Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:index, :new, :create, :update, :edit] do
    resources :messages, only: [:create, :index]

    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end