# RiskChain.AI – Supply Chain Delay Risk Prediction

Final-year project (TM471, Arab Open University – Egypt) by Basmla Nagy Hassona Bakr (22513708).

A machine-learning model (XGBoost, trained on the DataCo Supply Chain dataset) predicts whether a shipment will be
**LATE** or **ON-TIME**. The model is served through a Django web app with login/registration, a risk dashboard,
bilingual (English/Arabic) alerts and delay reports.

## Project structure
| Path | Description |
|---|---|
| `tm471_basmla_Nagy_Hassona_Bakr_22513708.ipynb` | Data preparation, feature engineering, model training and evaluation |
| `late_delivery_model.pkl` | Trained model used by the web app |
| `riskchain_backend/` | Django project (`api/` app: models, views, urls, templates) |
| `code_review/` | Standalone login page + styles used during UI review |

## Run locally
```bash
pip install -r requirements.txt
cd riskchain_backend
python manage.py migrate
python setup_auth.py        # creates the default site + a demo user (see script; change the password)
python manage.py runserver  # open http://127.0.0.1:8000
```

## Notes
* `db.sqlite3` and uploaded `media/` files are not tracked (see `.gitignore`); they are created on first run.
* Before any public deployment, replace `SECRET_KEY` in `settings.py`, set `DEBUG = False`, and change the demo password.
