class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat:#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def chat(obj)
    ActionCable.server.broadcast "chat:#{obj["room"]}", msg: obj["msg"], user: current_user
  end
end
