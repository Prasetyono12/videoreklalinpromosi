import React from 'react';
import {Audio, Sequence, interpolate, staticFile} from 'remotion';
import {AUDIO, TOTAL_FRAMES} from './config';

/** VO utama dan lapisan musik/SFX opsional dikendalikan melalui config.ts. */
export const AudioLayer: React.FC = () => (
  <>
    {AUDIO.voiceOver.enabled && (
      <Audio
        src={staticFile(AUDIO.voiceOver.file)}
        durationInFrames={TOTAL_FRAMES}
        playbackRate={AUDIO.voiceOver.playbackRate}
        volume={AUDIO.voiceOver.volume}
      />
    )}
    {AUDIO.music.enabled && (
      <Audio
        src={staticFile(AUDIO.music.file)}
        volume={(frame: number) =>
          AUDIO.music.volume *
          interpolate(frame, [0, 30, TOTAL_FRAMES - 60, TOTAL_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
        }
      />
    )}
    {AUDIO.sfx.enabled &&
      AUDIO.sfx.cues.map((cue) => (
        <Sequence key={`${cue.file}-${cue.frame}`} from={cue.frame} durationInFrames={60}>
          <Audio src={staticFile(cue.file)} volume={AUDIO.sfx.volume} />
        </Sequence>
      ))}
  </>
);
