import AudioPlayer from "@/components/layout/AudioPlayer";

export const AudioPage = () => {
  return (
    <>
      <AudioPlayer
      title={"kiyomizu"}
      artist={"Daniel Xie"}
      src={`${import.meta.env.BASE_URL}sounds/kiyomizu.mp3`}
      albumArt={`${import.meta.env.BASE_URL}sounds/kiyomizu.png`} />
    </>
  );
};
