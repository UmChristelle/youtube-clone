import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { BsMicFill } from 'react-icons/bs'

const VoiceSearchModal = ({ onClose }) => {
  const [transcript, setTranscript] = useState('')
  const [listening, setListening] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setError('Your browser does not support voice search.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.continuous = false

    recognition.onstart = () => setListening(true)

    recognition.onresult = (e) => {
      const text = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join('')
      setTranscript(text)

      if (e.results[e.results.length - 1].isFinal) {
        recognition.stop()
        navigate(`/search/${encodeURIComponent(text)}`)
        onClose()
      }
    }

    recognition.onerror = () => setError('Microphone access denied or unavailable.')
    recognition.onend = () => setListening(false)
    recognition.start()

    return () => recognition.abort()
  }, [])

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[#212121] rounded-2xl p-10 flex flex-col items-center gap-5 w-80 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300
          ${listening ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse' : 'bg-zinc-700'}`}>
          <BsMicFill className="text-white text-3xl" />
        </div>

        <p className="text-white text-base font-medium">
          {error ? error : listening ? 'Listening...' : 'Starting microphone...'}
        </p>

        {transcript && (
          <p className="text-zinc-300 text-sm text-center italic">"{transcript}"</p>
        )}

        <button
          onClick={onClose}
          className="flex items-center gap-1 text-zinc-400 hover:text-white text-sm transition-colors"
        >
          <AiOutlineClose size={14} /> Cancel
        </button>
      </div>
    </div>
  )
}

export default VoiceSearchModal