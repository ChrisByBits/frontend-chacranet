const Ticket = ( {user, description, onClick}) => {
  return (
    <li className="w-full h-28 flex items-center gap-5 hover:opacity-80 transition hover:cursor-pointer bg-primary-200 px-3 border-t-2 border-t-green-200" onClick={onClick}>
      <div className="w-[20%] flex justify-center">
        <span className="rounded-full bg-primary-100 size-16 flex justify-center items-center text-xl">{user.username[0]}</span>
      </div>
      <p className="w-full ">{description}</p>
    </li>
  );
}

export default Ticket;