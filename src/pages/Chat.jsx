import { useState, useEffect, useRef } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [newMessage, setNewMessage] = useState('')
  const [guestName, setGuestName] = useState(localStorage.getItem('chatGuestName') || '')
  const debugMode = false // TODO: remove this
  const [replyTo, setReplyTo] = useState(null)
  const [replyToName, setReplyToName] = useState('')
  const [replyToPreview, setReplyToPreview] = useState('')
  const [sending, setSending] = useState(false)
  const [lastId, setLastId] = useState(0)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false)
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  const formatTime = (iso) => {
    const d = new Date(iso.replace(' ', 'T'))
    return d.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
  }

  const handleChatScroll = () => {
    const container = messagesContainerRef.current
    if (container) {
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 100
      setShowScrollButton(!isNearBottom)
    }
  }

  const scrollChatToBottom = () => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    }
  }

  const getRoleBadge = (role) => {
    if (!role || role === 'listener') return null
    const badges = {
      admin: { text: 'Beheerder', class: 'bg-red-500/20 text-red-400 border-red-500/30' },
      station_manager: {
        text: 'Station Dir.',
        class: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      },
      moderator: {
        text: 'Moderator',
        class: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      },
      dj: { text: 'DJ', class: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      vip: { text: 'VIP', class: 'bg-green-500/20 text-green-400 border-green-500/30' },
    }
    return badges[role] || null
  }

  const getInitials = (name) => {
    return name.substring(0, 2).toUpperCase()
  }

  const fetchMessages = async () => {
    try {
      const limit = lastId === 0 ? 200 : 50
      console.log('fetch msgs', lastId)
      const response = await fetch(
        `/api/chat?action=get&room=general&since=${lastId}&limit=${limit}`
      )
      const data = await response.json()

      if (data.messages && data.messages.length > 0) {
        if (lastId === 0) {
          const allMessages = [...data.messages]
          let currentLastId = data.last_id

          if (data.messages.length >= 100 && data.last_id) {
            const response2 = await fetch(
              `/api/chat?action=get&room=general&since=${data.last_id}&limit=200`
            )
            const data2 = await response2.json()
            if (data2.messages && data2.messages.length > 0) {
              allMessages.push(...data2.messages)
              currentLastId = data2.last_id
            }
          }

          setMessages(allMessages)
          setLastId(currentLastId)
          setLoading(false)
          setShouldScrollToBottom(true)
        } else {
          setMessages((prev) => [...prev, ...data.messages])
          setLastId(data.last_id)
        }
      } else if (lastId === 0 && data.messages) {
        setMessages([])
        setLoading(false)
      }
    } catch (err) {
      console.error('Chat fetch error:', err)
      if (lastId === 0) setLoading(false)
    }
  }

  const sendMessage = async (e) => {
    e?.preventDefault()
    const msg = newMessage.trim()
    if (!msg || sending) return

    setSending(true)
    setNewMessage('')

    const name = guestName.trim() || 'Gast'
    if (guestName.trim()) {
      localStorage.setItem('chatGuestName', guestName.trim())
    }

    try {
      const body = { message: msg, name }
      if (replyTo) body.reply_to = replyTo

      const response = await fetch('/api/chat?action=send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      if (!data.success) {
        alert(data.error || 'Fout bij versturen.')
        setNewMessage(msg)
      } else {
        const optimisticMessage = {
          id: Date.now(),
          display_name: name,
          message: msg,
          avatar_color: '#3b82f6',
          created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
          user_role: null,
          pinned: 0,
          reply_to: replyTo,
          reply_preview: replyTo ? replyToPreview : null,
        }
        setMessages((prev) => [...prev, optimisticMessage])

        setReplyTo(null)
        setReplyToName('')
        setReplyToPreview('')
        setShouldScrollToBottom(true)

        fetchMessages()
      }
    } catch (err) {
      console.error('Send error:', err)
      alert('Netwerk fout.')
      setNewMessage(msg)
    } finally {
      setSending(false)
    }
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 3000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (shouldScrollToBottom && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
      setShouldScrollToBottom(false)
    }
  }, [messages, shouldScrollToBottom])

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-24">
      <section className="py-8 sm:py-12 bg-gradient-to-b from-background via-background to-background-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Live Chat</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              Chat met <span className="gradient-text">luisteraars</span>
            </h1>
            <p className="text-muted">Praat live mee met andere fans en onze DJ&apos;s</p>
          </div>

          {/* Chat Container */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            {/* Reply Bar */}
            {replyTo && (
              <div className="flex items-center justify-between gap-2 px-4 py-3 bg-blue-500/10 border-b border-blue-500/20 text-sm">
                <span className="flex-1 truncate">
                  ↩ Reageren op {replyToName}: {replyToPreview}
                </span>
                <button
                  onClick={() => {
                    setReplyTo(null)
                    setReplyToName('')
                    setReplyToPreview('')
                  }}
                  className="text-muted hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Messages */}
            <div className="relative">
              <div
                ref={messagesContainerRef}
                onScroll={handleChatScroll}
                className="h-[500px] overflow-y-auto p-4 sm:p-6 pb-8 space-y-4"
              >
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted">
                    <MessageCircle className="w-16 h-16 mb-4 opacity-50" />
                    <p>Nog geen berichten. Wees de eerste!</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const badge = getRoleBadge(msg.user_role)

                    return (
                      <div
                        key={msg.id}
                        className={`group flex items-start gap-3 ${
                          msg.pinned
                            ? 'bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3'
                            : ''
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                          style={{ background: msg.avatar_color || '#3b82f6' }}
                        >
                          {getInitials(msg.display_name)}
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Name & Badge & Time */}
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-semibold">{msg.display_name}</span>
                            {badge && (
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full border ${badge.class}`}
                              >
                                {badge.text}
                              </span>
                            )}
                            <span className="text-xs text-muted">{formatTime(msg.created_at)}</span>
                            {!!msg.pinned && <span className="text-xs">📌</span>}
                          </div>

                          {/* Reply preview */}
                          {msg.reply_preview && (
                            <div className="mb-2 pl-3 border-l-2 border-white/20 text-xs text-muted truncate">
                              ↩ {msg.reply_preview}
                            </div>
                          )}

                          {/* Message */}
                          <p className="text-sm sm:text-base break-words">{msg.message}</p>

                          {/* Reply button */}
                          <button
                            onClick={() => {
                              setReplyTo(msg.id)
                              setReplyToName(msg.display_name)
                              setReplyToPreview(msg.message.substring(0, 60))
                            }}
                            className="mt-2 text-xs text-muted hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                          >
                            ↩ Reageer
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef} className="h-1" />
              </div>

              {/* Scroll to bottom button */}
              {showScrollButton && (
                <button
                  onClick={scrollChatToBottom}
                  className="absolute bottom-4 right-4 bg-primary hover:bg-primary/90 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
                  title="Scroll naar beneden"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-4 sm:p-6 bg-black/20">
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Jouw naam (optioneel)"
                maxLength={30}
                className="w-full mb-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors"
              />

              <form onSubmit={sendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Typ een bericht..."
                  maxLength={500}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={sending || !newMessage.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Discord CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted mb-3">
              Wil je meer community features? Join onze Discord!
            </p>
            <a
              href="https://discord.gg/pAQ4NFkK9g"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Open Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
