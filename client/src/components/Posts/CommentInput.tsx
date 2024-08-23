const CommentInput = () => {
  return (
    <div className="">
      <label htmlFor="" className="mx-5">
        Add comment
      </label>
      <input
        type="text"
        placeholder="Enter your message"
        className="p-2 w-[90%] md:mx-5 rounded-[0.2rem] my-4"
      />
    </div>
  );
};

export default CommentInput;
