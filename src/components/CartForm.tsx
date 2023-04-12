import { ChangeEvent, FormEvent, useState } from 'react';

export default function CartForm({
  isCartOpen,
  onHideCart,
  onClearCart,
  cartSuccessMessage,
}: {
  isCartOpen: boolean;
  onHideCart: () => void;
  onClearCart: () => void;
  cartSuccessMessage: (msg: string) => void;
}) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    nameError: '',
    emailError: '',
  } as {
    name: string;
    email: string;
    nameError: string;
    emailError: string;
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState(prevState => ({
      ...prevState,
      [name]: value,
      [`${name}Error`]: '',
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    let isValid = true;
    const { name, email } = formState;

    if (!name) {
      setFormState(prevState => ({
        ...prevState,
        nameError: 'Field "Name" is required',
      }));

      isValid = false;
    }

    if (!email) {
      setFormState(prevState => ({
        ...prevState,
        emailError: 'Field "Email" is required',
      }));

      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setFormState(prevState => ({
        ...prevState,
        emailError: 'Please, enter correct email address',
      }));

      isValid = false;
    }

    if (isValid) {
      onClearCart();
      cartSuccessMessage('Your order is placed successfully!');
    }
  };

  const a11y = !isCartOpen && { tabIndex: -1, 'aria-hidden': true };

  return (
    <form onSubmit={handleSubmit} className="px-8 py-5 sm:px-10">
      <div className="mb-4">
        <label htmlFor="name" className="sr-only">
          Name
        </label>

        <input
          {...a11y}
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          placeholder="Your name*"
        />

        {formState.nameError && (
          <div className="form__error">{formState.nameError}</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="sr-only">
          Email
        </label>

        <input
          {...a11y}
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          placeholder="Your email*"
        />

        {formState.emailError && (
          <div className="form__error">{formState.emailError}</div>
        )}
      </div>

      <div className="flex items-center justify-end">
        <button
          {...a11y}
          type="button"
          onClick={onHideCart}
          className="button is_empty"
        >
          Close
        </button>

        <button {...a11y} type="submit" className="button ml-4">
          Order
        </button>
      </div>
    </form>
  );
}
