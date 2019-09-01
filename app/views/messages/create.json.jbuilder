json.message  @message.content
json.image  @message.image
json.user_name  @message.user.name
json.create_at  @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id