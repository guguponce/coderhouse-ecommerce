import SingleBookCover from "../SingleBookCover/SingleBookCover";
import Accordion from "../Accordion/Accordion";

export default function ItemDetail({ item }) {
  return (
    <article className="singleBook" id="single-book">
      <h1 id="name-single-book">{item.name}</h1>
      <h5>
        {item.authors.map((aut, i, arr) => (
          <>
            {aut}
            {!(i === arr.length - 1) && <span> - </span>}
          </>
        ))}
      </h5>
      <div id="img-description-box" className="">
        <div id="img-single-book">
          <SingleBookCover imgURL={item.imageurl} bookTitle={item.name} />
        </div>
        <p id="description-single-book">
          {item.longDescription ? item.longDescription : item.shortDescription}
        </p>
      </div>
      <Accordion title={"Details"} id={"details-accordion"}>
        <p className="accordionContent">
          <span className="detailsTitle">Categories:</span>
          {item.categories.join(", ")}
        </p>
        <p className="accordionContent">
          <span className="detailsTitle">Pages:</span> {item.pages}
        </p>{" "}
        <p className="accordionContent">
          <span className="detailsTitle">ISBN:</span> {item.isbn}{" "}
        </p>
        <p className="accordionContent">
          <span className="detailsTitle">Publish year:</span> {item.year}
        </p>
      </Accordion>

      <p id="price-single-book">${item.saleprice}</p>
    </article>
  );
}
