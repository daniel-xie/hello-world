import AudioPlayer from "@/components/layout/AudioPlayer";

export const AudioPage = () => {
  return (
    <>
    <div className="flex align-middle justify-center">
      <AudioPlayer
      title={"kiyomizu"}
      artist={"Daniel Xie"}
      src={`${import.meta.env.BASE_URL}sounds/kiyomizu.mp3`}
      albumArt={`${import.meta.env.BASE_URL}sounds/kiyomizu.png`} />
      </div>
    </>
  );
};
