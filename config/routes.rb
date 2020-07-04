Rails.application.routes.draw do
  devise_for :users
  root "messages#index"
  resources :users, only: [:edit, :update]
  resources :groups, only: [:create, :new, :edit, :update]
end
