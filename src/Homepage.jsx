import { useState } from 'react';

const Homepage = ({ setToken, token }) => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputCategoryId, setInputCategoryId] = useState('');
  const [inputImageUrl, setInputImageUrl] = useState('');

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const addProduct = async(event) => {
    event.preventDefault();
    // console.log(`INPUT TITLE`, inputTitle);
    // console.log(`INPUT PRICE`, inputPrice);
    // console.log(`INPUT DESCRIPTION`, inputDescription);
    // console.log(`INPUT CATEGORY ID`, inputCategoryId);
    // console.log(`INPUT IMAGE URL`, inputImageUrl);

    await fetch('https://api.escuelajs.co/api/v1/products', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: inputTitle,
        price: inputPrice,
        description: inputDescription,
        categoryId: inputCategoryId,
        images: [inputImageUrl]
      })
    });

    setInputTitle('');
    setInputPrice('');
    setInputDescription('');
    setInputCategoryId('');
    setInputImageUrl('');
  }

  const logInUser = async(event) => {
    event.preventDefault();
    // console.log('INPUT EMAIL', inputEmail);
    // console.log('INPUT PASSWORD', inputPassword);

    const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: inputEmail,
        password: inputPassword
      }),
    });

    const tokenObj = await response.json();
    const accessToken = tokenObj.access_token;
    setToken(accessToken);
    localStorage.setItem('token', accessToken);
  }

  return (
    <>
      {
        token ? 
          null : 
          <form onSubmit={logInUser}>
            <input 
              placeholder="email" 
              onChange={(event) => { setInputEmail(event.target.value)}}
            />
            <input 
              placeholder="password" 
              onChange={(event) => { setInputPassword(event.target.value)}}
            />

            <button>Log In</button>
          </form>
      }
      

      <br></br>

      <form onSubmit={addProduct}>
        <input 
          placeholder="title"
          onChange={(event) => { setInputTitle(event.target.value) }}
          value={inputTitle}
        />
        <input 
          type="number"
          placeholder="price"
          onChange={(event) => { setInputPrice(event.target.value) }}
          value={inputPrice}
        />
        <input 
          placeholder="description"
          onChange={(event) => { setInputDescription(event.target.value)}}
          value={inputDescription}
        />
        <input 
          type="number" 
          placeholder="category id"
          onChange={(event) => { setInputCategoryId(event.target.value)}}
          value={inputCategoryId}
        />
        <input 
          placeholder="images"
          onChange={(event) => { setInputImageUrl(event.target.value)}}
          value={inputImageUrl}
        />

        <button>Add Product</button>
      </form>
    </>
  )
}

export default Homepage;