export default function CheckoutInput({
  handleChangeInput,
  inputData,
  name,
  type,
}) {
  return (
    <div className="inputColumnBox">
      <label htmlFor="name">
        {name[0].toUpperCase()}
        {name.slice(1).replace("-", " ")}:
      </label>
      <input
        name={name}
        //   {...register("name", {
        //     required: true,
        //     maxLength: 40,
        //     pattern: /^[a-zA-ZäöüÄÖÜß'\-\s]+$/,
        //   })}
        type={type}
        required
        value={inputData.name}
        onChange={handleChangeInput}
      />
      {/* {errors?.name?.type === "required" && <p>This field is required</p>}
            {errors?.name?.type === "maxLength" && (
              <p>First name cannot exceed 20 characters</p>
            )}
            {errors?.name?.type === "pattern" && (
              <p>Alphabetical characters only</p>
            )} */}
    </div>
  );
}
