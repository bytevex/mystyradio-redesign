import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

const STREAM_URL = 'https://radio.mistyradio.org/listen/mistyradio/radio.mp3'
const API_URL = 'https://radio.mistyradio.org/api/nowplaying/mistyradio'

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      isPlaying: false,
      isMuted: false,
      volume: 80,

      track: {
        title: 'MistyRadio',
        artist: '',
        albumArt: null,
      },

      listeners: 0,
      isLive: false,

      audioRef: null,

      setAudioRef: (ref) => set({ audioRef: ref }),

      play: async () => {
        const { audioRef } = get()
        if (!audioRef) return

        try {
          // oude versie: audioRef.src = STREAM_URL;
          audioRef.src = `${STREAM_URL}?t=${Date.now()}`
          await audioRef.play()
          set({ isPlaying: true })
        } catch (error) {
          console.error('stream play error:', error)
        }
      },

      pause: () => {
        const { audioRef } = get()
        if (!audioRef) return

        audioRef.pause()
        audioRef.src = ''
        set({ isPlaying: false })
      },

      togglePlay: () => {
        const { isPlaying, play, pause } = get()
        isPlaying ? pause() : play()
      },

      setVolume: (vol) => {
        const { audioRef } = get()
        const volume = Math.max(0, Math.min(100, vol))

        set({ volume })

        if (audioRef) {
          audioRef.volume = volume / 100
        }

        if (volume > 0 && get().isMuted) {
          set({ isMuted: false })
          if (audioRef) audioRef.muted = false
        }
      },

      toggleMute: () => {
        const { audioRef, isMuted } = get()
        const newMuted = !isMuted

        set({ isMuted: newMuted })

        if (audioRef) {
          audioRef.muted = newMuted
        }
      },

      fetchNowPlaying: async () => {
        try {
          const response = await axios.get(`${API_URL}?t=${Date.now()}`)
          const data = response.data

          if (data.now_playing?.song) {
            const song = data.now_playing.song

            set({
              track: {
                title: song.title || 'MistyRadio',
                artist: song.artist || '',
                albumArt: song.art || null,
              },
              listeners: data.listeners?.current ?? 0,
              isLive: data.live?.is_live ?? false,
            })
          }
        } catch (error) {
          console.error('now playing fetch error:', error)
        }
      },

      handleError: () => {
        const { isPlaying, play } = get()

        if (isPlaying) {
          set({ isPlaying: false })

          setTimeout(() => {
            if (!get().isPlaying) {
              play()
            }
          }, 3000)
        }
      },

      handleEnded: () => {
        const { play } = get()

        setTimeout(() => {
          play()
        }, 1000)
      },
    }),
    {
      name: 'mistyplayer',
      partialize: (state) => ({
        volume: state.volume,
        isMuted: state.isMuted,
      }),
    }
  )
)
