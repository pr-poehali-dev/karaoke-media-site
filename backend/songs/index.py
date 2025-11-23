'''
Business: API для работы с каталогом песен - получение, поиск и фильтрация
Args: event - dict с httpMethod, queryStringParameters
      context - объект с атрибутами request_id, function_name
Returns: HTTP response с песнями из базы данных
'''
import json
import os
from typing import Dict, Any, List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        search: Optional[str] = params.get('search')
        genre: Optional[str] = params.get('genre')
        language: Optional[str] = params.get('language')
        limit: int = int(params.get('limit', '100'))
        offset: int = int(params.get('offset', '0'))
        
        conn = get_db_connection()
        cur = conn.cursor()
        
        query_parts: List[str] = ['SELECT * FROM songs WHERE 1=1']
        
        if search:
            search_lower = search.lower()
            query_parts.append(f"AND (LOWER(title) LIKE '%{search_lower}%' OR LOWER(artist) LIKE '%{search_lower}%')")
        
        if genre and genre != 'Все':
            query_parts.append(f"AND genre = '{genre}'")
        
        if language and language != 'Все':
            query_parts.append(f"AND language = '{language}'")
        
        query_parts.append('ORDER BY views_count DESC')
        query_parts.append(f'LIMIT {limit} OFFSET {offset}')
        
        query = ' '.join(query_parts)
        cur.execute(query)
        songs = cur.fetchall()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'songs': [dict(song) for song in songs],
                'total': len(songs)
            }, ensure_ascii=False, default=str),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
