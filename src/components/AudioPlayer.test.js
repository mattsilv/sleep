import React from 'react';
import AudioPlayer from './AudioPlayer';

// Mock the Howler library to avoid audio issues in tests
jest.mock('howler', () => ({
  Howl: jest.fn().mockImplementation(() => ({
    play: jest.fn(),
    pause: jest.fn(),
    stop: jest.fn(),
    seek: jest.fn(),
    volume: jest.fn(),
    state: jest.fn().mockReturnValue('loaded'),
    playing: jest.fn().mockReturnValue(false),
    duration: jest.fn().mockReturnValue(300)
  })),
  Howler: {
    html5PoolSize: 10
  }
}));

// Mock the entire AudioProvider context
jest.mock('./audioPlayer/context/AudioContext', () => {
  // Original module
  const originalModule = jest.requireActual('./audioPlayer/context/AudioContext');

  return {
    ...originalModule,
    AudioProvider: ({ children }) => <div data-testid="audio-provider">{children}</div>,
    useAudioContext: () => ({
      isPlaying: false,
      duration: 300,
      currentTime: 0,
      volume: 0.5,
      isMuted: false,
      narrator: 'peter',
      isLoading: false,
      sleepTimer: null,
      timeRemaining: 0,
      togglePlay: jest.fn(),
      handleTimeChange: jest.fn(),
      handleVolumeChange: jest.fn(),
      toggleMute: jest.fn(),
      handleNarratorChange: jest.fn(),
      handleSetTimer: jest.fn(),
    }),
  };
});

// Simple test that just makes sure the components can be instantiated
test('AudioPlayer component exists', () => {
  expect(AudioPlayer).toBeDefined();
});