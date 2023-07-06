import Card from './Card';

const tools = [
  'Affinity Designer',
  'Figma',
  'Procreate',
  'Illustrator',
  'InDesign',
  'Tokens Studio',
  'Photoshop',
  'Pitch',
  'Notion',
];

export default function ToolsCard() {
  return (
    <Card>
      <div className="flex flex-col gap-8 h-full">
        <div className="flex justify-between">
          <span className="text-text-secondary">Tools I love</span>
        </div>
        <div className="text-[3.5rem] leading-[4rem] h-[calc(3.5rem*4)] md:h-[calc(3.5rem*5)] xl:h-[calc(3.5rem*4)] overflow-hidden relative">
          <div className="track animate-[carousel-vertical_10s_linear_infinite]">
            {tools.concat(tools).map((t, i) => (
              <div key={i} className="font-medium font-archivo text-text-primary">
                {t}
              </div>
            ))}
          </div>
          <div className="[background:var(--panel-blend-layer)] h-[100px] w-full top-0 absolute" />
          <div className="[background:var(--panel-blend-layer)] h-[100px] w-full bottom-[-1px] absolute rotate-180" />
        </div>
        <p className="leading-7 text-text-secondary mt-auto">
          I started in print, and gradually turned to digital, so over the years my go-to companion
          software switched from Illustrator, to InDesign, Procreate, Sketch, Figma. I enjoyed each
          from the stack, but my fav is Figma &#9825;
        </p>
      </div>
    </Card>
  );
}
