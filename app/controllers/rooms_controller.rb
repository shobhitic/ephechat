class RoomsController < ApplicationController
  def index
  end

  def show
    @name = cookies[:name]
  end

  def create
    name = params[:name]
    cookies[:name] = name
    room_id = params[:room] || SecureRandom.alphanumeric(10)
    redirect_to room_url(id: room_id)
  end
end
