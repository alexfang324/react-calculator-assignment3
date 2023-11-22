function Screen({ displayVal }) {
  return (
    <div className="screen">
      <h1 className="display-value">{displayVal == '' ? '0' : displayVal}</h1>
    </div>
  );
}

export default Screen;
