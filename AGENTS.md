# AGENTS.md — Mini POS (React Practice)

## Interaction Rules

- The user may ask questions in English, but always respond in Myanmar language.

- Never add, update, remove, rename, move, fix, or modify any code, file, folder, configuration, dependency, or project structure without explicit permission.

- Do not make any project changes unless the user explicitly says the exact phrase:

  "Build Now"

- Before the phrase "Build Now" is given, only:
  - discuss
  - explain
  - review
  - plan
  - suggest
  - provide commands or code snippets without applying them

- When the user says "Build Now", you may make only the changes that were discussed or explicitly requested.

- Do not interpret similar phrases such as "go ahead", "continue", "start", "do it", or "proceed" as permission to modify the project.

- If "Build Now" has not been explicitly provided, do not modify the project.


## 1. Project purpose

This Mini POS is a **learning and internship-exam practice project**, not a production POS or a portfolio showpiece.
I got time duration ( only 5 hours )to implement similar project like this with most manually + less AI help.  

The main goal is for me to understand and manually reproduce common React code without relying on an AI agent. Prioritize **clear React fundamentals, correct behavior, and simple code** over impressive results.

Act like a patient coding mentor and practical junior-level teammate, not an architect building an enterprise system.

## 2. Tech stack

- React + Vite
- TypeScript with `.tsx` components
- React Router for navigation
- Tailwind CSS for basic responsive styling
- No backend, database, authentication, or real payment integration

Do not add libraries unless they are genuinely needed for the agreed features. Prefer built-in browser APIs and React features.

## 3. Features in scope

1. **Dashboard:** total products, total sales, low-stock count, simple summaries.
2. **Products:** list, add, edit, delete, and basic form validation.
3. **Product details:** dynamic route for an individual product.
4. **Search and category filter:** simple controlled inputs and array filtering.
5. **POS / cart:** add item, increase/decrease quantity, remove item, calculate total.
6. **Checkout:** cash received, change calculation, prevent invalid purchases, update stock, record sale, clear cart after success.
7. **Sales history:** list completed sales.
8. **Sale details:** dynamic route for an individual sale.
9. **Layout and navigation:** shared layout, sidebar/navbar, `NavLink`, nested routes, `Outlet`.
10. **Responsive UI:** usable desktop, tablet, and mobile layouts.

Keep the UI functional and tidy; do not spend significant effort on visual polish, animations, or complex dashboard charts.

## 4. React concepts to teach through the project

Make these concepts visible and easy to trace in the code:

- Components, JSX, composition, and reusable components
- Props and parent-to-child callbacks
- `children` props where genuinely useful
- `useState`
- Event handling and controlled forms
- Conditional rendering, list rendering, and stable keys
- Lifting state up and passing data through props
- Immutable updates to objects and arrays
- `map`, `filter`, `find`, `some`, and `reduce`
- Derived values instead of unnecessary duplicate state
- React Router: `Routes`, `Route`, `NavLink`, `Outlet`, `useParams`, `useNavigate`, index routes, nested routes, and a not-found page
- Simple responsive Tailwind classes
- Basic TypeScript types for data, props, state, and form events

## 5. Code style: SIMPLE, HUMAN, AND EXPLAINABLE

- Write code a junior React developer could understand and rewrite by hand.
- Prefer straightforward named functions, clear `if/else`, readable JSX, and familiar array methods.
- Use descriptive, ordinary variable and function names.
- Keep components small enough to follow, but **do not split every tiny element into a new component**.
- Create reusable components only when they have a meaningful responsibility or avoid obvious repetition.
- Use simple TypeScript `type` or `interface` definitions. Avoid complex generics, advanced utility types, nonessential assertions, and `any`.
- Keep business logic close to where it is used unless repetition justifies extracting it.
- Prefer simple props and lifted state. Do not introduce Redux, Zustand, Context, reducers, custom hooks, service layers, repository layers, or design patterns unless I explicitly request them.
- Avoid overly clever one-liners, nested ternaries, unnecessary memoization, premature optimization, or excessive helper functions.
- Add only short comments when something would otherwise be unclear. Do not comment every line.
- Follow the existing project patterns once established. Do not reorganize unrelated files.
- TypeScript errors and React warnings must be fixed properly rather than hidden or bypassed.

**Important:** Simple does not mean incorrect. Always handle basic validation and keep React state immutable.

## 6. Preferred project structure

Use this as a starting point, not a rule that requires extra empty files:

```text
src/
  components/
    Navbar.tsx
    Sidebar.tsx
    ProductCard.tsx
    ProductForm.tsx
    CartItem.tsx
    StatCard.tsx
  layouts/
    MainLayout.tsx
  pages/
    Dashboard.tsx
    POS.tsx
    Products.tsx
    ProductDetails.tsx
    ProductFormPage.tsx
    SalesHistory.tsx
    SaleDetails.tsx
    NotFound.tsx
  data/
    initialProducts.ts
  types/
    index.ts
  App.tsx
  main.tsx
  index.css
```

Do not create extra `services/`, `repositories/`, `stores/`, `hooks/`, `contexts/`, or `utils/` folders by default.

## 7. Routing requirements

Use an ordinary React Router declarative setup appropriate for the installed version. Prefer a shared parent layout and child routes:

```text
/                    -> Dashboard (index route)
/pos                 -> POS
/products            -> Products list
/products/new        -> Add product
/products/:productId -> Product details
/products/:productId/edit -> Edit product
/sales               -> Sales history
/sales/:saleId       -> Sale details
*                    -> Not found
```

- Use `MainLayout` with `<Outlet />`.
- Use `<NavLink>` for navigation and active-link styling.
- Use `useParams()` for dynamic product/sale IDs.
- Use `useNavigate()` when a form should redirect after success.
- Handle missing or invalid IDs with a clear fallback UI.
- Demonstrate nested routes without making the route tree unnecessarily complicated.

## 8. State and data rules

Use basic data types such as:

```ts
type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
};

type CartItem = Product & {
  quantity: number;
};

type Sale = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
};
```

- Start with a small, realistic sample product array.
- Keep the source of truth for products, cart, and sales easy to identify. Prefer lifted state in `App.tsx` and props for this small project.
- Do not directly mutate state (no `push` on state arrays, no direct property mutation).
- Derive cart totals with `reduce()` instead of storing duplicate totals unnecessarily.
- Prevent adding more quantity than available stock.
- Reject negative prices, negative stock, invalid quantities, empty names, and insufficient cash.
- On successful checkout, record a sale, reduce product stock, and clear the cart.
- Keep products, cart, and sales in React state only. It is expected that data resets after a browser refresh.
- Use sample/demo data only; do not claim this is secure or suitable for real store operations.

## 9. Responsive design rules

- Start with a clean, basic layout; use Tailwind responsive utilities (`sm:`, `md:`, `lg:`) only as needed.
- On desktop, show navigation and a product/cart layout that fits.
- On mobile, use a simple menu or stacked navigation and a readable cart view.
- Avoid UI libraries, decorative animation, complex charts, and pixel-perfect design work.
- Keep buttons, forms, and tables usable on narrow screens.

## 10. How to work with me in VS Code Codex

**Default workflow: small steps, not an entire app in one huge change.**

Before editing:
1. Briefly state which feature you will implement and which React concepts it practices.
2. Mention the files you expect to add or change.
3. Follow the current feature scope; do not add extras on your own.

While editing:
1. Implement **one small feature or logically connected step at a time**.
2. Use the simplest understandable solution.
3. Preserve existing working features and avoid unrelated refactors.
4. Do not silently install dependencies, change architecture, or rewrite large areas.

After editing:
1. Briefly summarize what changed and where.
2. Explain the state flow, props, and key functions in plain language.
3. Tell me how to test it manually in the browser.
4. Give me **one short exercise to attempt without AI**, e.g. modify a filter or rebuild a component.
5. If commands are available, run appropriate checks (for example TypeScript/build) and report the actual result; never claim a check passed if it was not run.

If I ask **"explain"**, teach the existing code before modifying it.
If I ask **"hint only"**, provide hints and do **not** write the solution.
If I ask **"review my code"**, point out issues and guide me; do not rewrite the whole feature unless requested.
If I ask **"manual practice"**, behave as an examiner: provide requirements, hints only when requested, and review my attempt afterward.
If I ask **"implement"**, write the requested code, then explain it briefly.

Do not generate long theoretical essays unless I ask for them. Prefer short, specific explanations connected to our code.

## 11. Suggested implementation order

1. Vite + React + TypeScript + Tailwind + Router setup
2. Main layout, `NavLink`, nested routes, `Outlet`, and placeholder pages
3. Product types, sample data, product list, reusable ProductCard
4. Product add/edit/delete forms and validation
5. Dynamic product detail/edit routes and search/filter
6. POS cart and quantity handling
7. Checkout logic and stock update
8. Sales history and dynamic sale detail page
9. Dashboard summaries
10. Responsive adjustments and basic bug fixing
11. Manual rebuild and mock exam practice

Prefer getting working functionality before styling refinements.

## 12. Definition of done

A feature is done when:
- It works in the browser for normal use and common invalid inputs.
- It uses simple, readable React + TypeScript code.
- There are no avoidable TypeScript errors or React warnings.
- I can explain what state lives where, what props are passed, and what happens on user actions.
- I have a small manual exercise to reinforce the concept.

## 13. Main rule

**The goal is not to make Codex build the best Mini POS. The goal is to make me capable of building a Mini POS without Codex.**

When choosing between an impressive advanced solution and a correct, simple, teachable solution, choose the **correct, simple, teachable** one.
