import { Button, buttonVariants } from './Button';
import { render } from '@/test/test-utils';

describe('<Button />', () => {
  it('should render correct default properties', () => {
    const { asFragment } = render(<Button>Submit</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct variants', () => {
    const { asFragment } = render(
      <div>
        {buttonVariants.map((variant) => (
          <Button key={variant} variant={variant}>
            Submit
          </Button>
        ))}
      </div>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow to add a class using className prop', () => {
    const { asFragment } = render(<Button className="ml-2">Submit</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
