function Button({ onBtnClick, btnContent }) {
  return (
    <button
      key={btnContent.text}
      className={`${btnContent.className} grid-item`}
      onClick={() => {
        onBtnClick(btnContent);
      }}
    >
      {btnContent.text}
    </button>
  );
}

export default Button;
