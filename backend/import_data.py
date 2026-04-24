import os
import django
import kagglehub
import pandas as pd

# Configuração do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import DadosConsumo

def carregar_dados():
    print("Iniciando download do dataset via KaggleHub...")
    path = kagglehub.dataset_download("jayjoshi37/reelsshorts-consumption-vs-attention-span")
    
    # Lista os arquivos baixados para vermos o que tem lá
    arquivos = os.listdir(path)
    print(f"Arquivos encontrados: {arquivos}")

    # Procura por qualquer arquivo que termine com .csv
    csv_files = [f for f in arquivos if f.endswith('.csv')]

    if not csv_files:
        print("❌ Erro: Nenhum arquivo CSV encontrado!")
        return

    # Pega o primeiro CSV encontrado
    csv_path = os.path.join(path, csv_files[0])
    print(f"📂 Lendo o arquivo: {csv_path}")
    
    df = pd.read_csv(csv_path)
    print(f"✅ Dataset carregado! {len(df)} registros encontrados.")

    # Limpa o banco antes de importar
    DadosConsumo.objects.all().delete()

    objetos = []
    for _, row in df.iterrows():
        # Usando os nomes das colunas que você listou anteriormente
        objetos.append(DadosConsumo(
            user_id=row['user_id'],
            age=row['age'],
            reels_watch_time_hours=row['reels_watch_time_hours'],
            daily_screen_time_hours=row['daily_screen_time_hours'],
            sleep_hours=row['sleep_hours'],
            attention_span_score=row['attention_span_score'],
            focus_level=row['focus_level'],
            task_completion_rate=row['task_completion_rate'],
            stress_level=row['stress_level'],
            platform=row['platform']
        ))
    
    DadosConsumo.objects.bulk_create(objetos)
    print("🚀 Dados importados com sucesso para o Django!")

if __name__ == "__main__":
    carregar_dados()