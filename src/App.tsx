import './App.css';

function App() {
  const images = [
    'blue_sweater.jpg',
    '2-women-pantsuits-steps.jpg',
    'business_guy_laptop_coffee.jpg',
    'clothing.jpg',
    'green_shirt.png',
    'happy-couple.jpg',
    'orange_vest.jpg',
    'purple-suit-hanky-couch.jpg',
    'shoes_orig.jpg',
    'shoppable_dress.jpg',
    'striped_sweater.jpg',
    'suit_shirt_rock.jpg',
    'white_sweater.jpg',
  ];

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mt-4">Winter Collection</h1>
        <img
          src="https://placehold.jp/d2d4ea/d2d4ea/300x100.jpg"
          alt="Placeholder"
          className="w-full h-auto rounded"
        />
      </header>

      <main>
        <section className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-3 gap-2">
          {images.map((image) => (
            <a href={`${image}`} target="_blank">
              <img
                key={image}
                alt=""
                src={`https://cloudinary-devs.github.io/cld-docs-assets/assets/images/research/${image}`}
              />
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
