import React from "react";

const MessageBox = () => {
  return (
    <div>
      <h1> Cart is empty </h1>
      <div>
        <Link
          to={`/product/${item.slug}`}
          className="text-lg font-medium text-gray-900 hover:underline"
        >
          {item.name}
        </Link>
        <p className="mt-1 text-sm text-gray-500">{item.price}</p>
      </div>
    </div>
  );
};

export default MessageBox;
