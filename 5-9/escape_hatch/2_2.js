import {useRef} from 'react'
export default function Page() {
  const ref=useRef(null);
  return (
    <>
      <nav>
        <button onClick={()=>ref.current.focus()}>Search</button>
      </nav>
      <input ref={ref}
        placeholder="Looking for something?"
      />
    </>
  );
}
