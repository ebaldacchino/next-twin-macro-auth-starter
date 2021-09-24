import tw from 'twin.macro';

const Main = tw.main`flex flex-col gap-2 h-screen items-center justify-center`;
const Form = tw.form`flex flex-col gap-2`;
const Input = tw.input`border px-1`;
const Button = tw.button`bg-blue-500 hover:bg-blue-600 text-white py-1 px-2`;
const LinkButton = tw.a`bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 text-center`;
const A = tw.a`text-blue-500 hover:text-blue-600 hover:underline text-center`;
const Err = tw.small`text-red-500`;
const Title = tw.h1`text-2xl`;

export { Main, Title, Form, Input, Button, LinkButton, A, Err };
