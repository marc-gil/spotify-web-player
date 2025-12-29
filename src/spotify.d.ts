export { };

declare global {

  namespace Spotify {
    interface Player {
      connect(): Promise<boolean>;
      disconnect(): void;
      togglePlay(): void;
      previousTrack(): void;
      nextTrack(): void;
      setVolume(value: Float): void;
      addListener(event: string, callback: Function): void;
    }

    const Player: {
      new(options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume?: number;
      }): Player;
    };
  }

}