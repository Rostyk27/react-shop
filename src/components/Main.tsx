import Content from './Content';
import Products from './Products';

export default function Main() {
  return (
    <main id="main" className="flex-[1_0_auto] overflow-hidden">
      <Content />
      <Products />
    </main>
  );
}
