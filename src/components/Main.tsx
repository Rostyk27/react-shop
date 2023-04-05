import Header from './Header';
import Content from './Content';

export default function Main() {
  return (
    <div id="main" className="flex-[1_0_auto] overflow-hidden">
      <Header />
      <Content />
    </div>
  );
}
