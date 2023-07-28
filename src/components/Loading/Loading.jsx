import loadingGif2 from "/loading/loading.webm";
import loadingGif2mp4 from "/loading/loading.mp4";

export default function Loading() {
  return (
    <div className="loadingContainer">
      <video autoPlay loop muted playsInline>
        <source src={loadingGif2} type="video/webm" />
        <source src={loadingGif2mp4} type="video/mp4" />
      </video>
    </div>
  );
}
