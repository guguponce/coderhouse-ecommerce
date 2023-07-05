export default function SingleBookCover({ imgURL, bookTitle }) {
  return (
    <div id="whole-book">
      <div id="side"></div>
      <div id="front">
        <img src={imgURL} alt={bookTitle} />
      </div>
    </div>
  );
}
