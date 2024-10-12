interface blogDetails{
    title: string,
    content: string,
    authorName: string,
    publishedDate:  string,
}
function SingleBlog({title, content, authorName, publishedDate}: blogDetails) {
  return (
    <div>
        <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">{title}</h1>

        <div className="flex items-center mb-4 text-gray-600">
          <span className="mr-4 text-lg font-medium">{authorName}</span>
          <span className="text-sm">{publishedDate}</span>
        </div>

        <div className="text-lg leading-relaxed text-gray-800">
         {content}
           </div>

        <div className="w-full h-1 mt-8 bg-slate-200"></div>

        <div className="mt-6 text-sm text-gray-500">
          <p>Written by <span className="font-semibold">{authorName}</span></p>
          <p>Published on {publishedDate}</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SingleBlog
