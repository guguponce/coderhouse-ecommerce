import loadingGif from "/loading.gif";

export default function Loading() {
  return (
    <div className="loadingContainer">
      <img src={loadingGif} alt="loading" />
    </div>
  );
}
