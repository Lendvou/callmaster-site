import React, { useEffect, useState } from 'react'
import ChatBox, { ChatFrame } from 'react-chat-plugin'
import apiClient from 'utils/apiClient'

const initialMessages = [
	{
		// id: 1,
		text: 'This is my message',
		timestamp: new Date().getTime(),
		type: 'text',
		author: {
			username: 'Jru kakahi',
			id: 1,
			avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
		},
	},
	{
		// id: 1,
		text: 'This is his message',
		timestamp: new Date().getTime(),
		type: 'text',
		author: {
			username: 'Jru kakahi',
			id: 2,
			avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
		},
	},
]

const Chat = () => {
	const [messages, setMessages] = useState<any[]>(initialMessages)

	const sendMessage = (mes: any) => {
		console.log('send message', mes)
		const newMessage = {
			// id: 1,
			text: mes,
			timestamp: new Date().getTime(),
			type: 'text',
			author: {
				username: 'Jru kakahi',
				id: 1,
				avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
			},
		}

		const newList = messages.concat(newMessage)
		setMessages(newList)
	}

	useEffect(() => {
		const createChat = async () => {}

		const fetchMessages = async () => {
			const query = {
				$limit: 100,
				$sort: { createdAt: -1 },
				chatId: 3,
			}
			const result = await apiClient.service('messages').find({ query })

			setMessages(result.data)
		}
	}, [])

	return (
		<div className="chat">
			<ChatBox
				messages={messages}
				userId={1}
				onSendMessage={sendMessage}
				width={'400px'}
				height={'600px'}
			/>
		</div>
	)
}

export default Chat
