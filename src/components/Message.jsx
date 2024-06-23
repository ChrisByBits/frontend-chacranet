const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer.data);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const bufferToImageUrl = (buffer) => {
  const base64Flag = 'data:image/jpeg;base64,';
  const imageStr = arrayBufferToBase64(buffer);
  return base64Flag + imageStr;
};

const bufferToVideoUrl = (buffer, contentType) => {
  const blob = new Blob([new Uint8Array(buffer.data)], { type: contentType });
  return URL.createObjectURL(blob);
};

const Message = ({ message, timestamp, user, isSender, image, video }) => {
  const messageClass = isSender
    ? 'bg-green-200 text-green-800 ml-auto'
    : 'bg-green-800 text-white mr-auto';

  const date = new Date(timestamp);
  const formattedTime = date.toTimeString().slice(0, 5);

  return (
    <li className={`flex mb-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`p-3 rounded-lg ${messageClass}`}>
        {!isSender && <p className="text-sm text-white mb-1 font-extrabold">{user.username}</p>}
        {message && <p className="">{message}</p>}
        {image && (
          <div className="mt-2">
            <img src={bufferToImageUrl(image.data)} alt="Imagen adjunta" className="max-w-full max-h-96 rounded-lg object-contain" />
          </div>
        )}
        {video && (
          <div className="mt-2">
            <video controls className="max-w-full max-h-96 rounded-lg">
              <source src={bufferToVideoUrl(video.data, video.contentType)} type={video.contentType} />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <span className="text-xs block text-right">{formattedTime}</span>
      </div>
    </li>
  );
};

export default Message;