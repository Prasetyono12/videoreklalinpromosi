import React from 'react';
import {Composition} from 'remotion';
import {RekLaLinPromo, RekLaLinPromoVertical} from './RekLaLinPromo';
import {FORMATS, FPS, SCENES, TOTAL_FRAMES} from './config';
import {assertNarrationFitsTimeline} from './narration';

// Pemeriksaan linimasa: adegan harus berurutan, rapat, dan berakhir tepat di TOTAL_FRAMES.
const validateTimeline = () => {
  let cursor = 0;
  for (const s of SCENES) {
    if (s.from !== cursor) throw new Error(`Adegan ${s.id} dimulai di frame ${s.from}, seharusnya ${cursor}`);
    cursor += s.duration;
  }
  if (cursor !== TOTAL_FRAMES) throw new Error(`Total frame adegan ${cursor} tidak sama dengan ${TOTAL_FRAMES}`);
  assertNarrationFitsTimeline();
};
validateTimeline();

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id={FORMATS.vertical.id} component={RekLaLinPromoVertical} durationInFrames={TOTAL_FRAMES} fps={FPS} width={FORMATS.vertical.width} height={FORMATS.vertical.height} />
      <Composition id={FORMATS.landscape.id} component={RekLaLinPromo} durationInFrames={TOTAL_FRAMES} fps={FPS} width={FORMATS.landscape.width} height={FORMATS.landscape.height} />
    </>
  );
};
