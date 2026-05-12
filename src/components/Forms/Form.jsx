import { Button } from "./Button";
import { DivWrapper } from "./DivWrapper";

export const Form = ({ handleSubmit, setUsername, setPassword, btnText }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-5 text-lg"
    >
      <DivWrapper>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-sm py-0.5 px-1"
        />
      </DivWrapper>
      <DivWrapper>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-sm py-0.5 px-1"
        />
      </DivWrapper>
      <Button btnText={btnText} />
    </form>
  );
};
