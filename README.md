
  # Space Launch Analytics

  This is a code bundle for Space Launch Analytics. The original project is available at https://www.figma.com/design/rRTUNlpc1HZV52O5XHUV6b/Space%C2%A0Launch%C2%A0Analytics.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
## Transformación de Datos (Sprint 1)
Para convertir el dataset crudo (`data/launches_llapi.csv`) a JSON validado (`data/launches_llapi.json`):
```bash
python3 data/csv_to_json.py