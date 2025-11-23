'''
Business: API для управления избранными песнями пользователя
Args: event - dict с httpMethod, body, headers
      context - объект с атрибутами request_id, function_name
Returns: HTTP response с избранными песнями или статусом операции
'''
import json
import os
from typing import Dict, Any
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
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    user_id: str = headers.get('x-user-id') or headers.get('X-User-Id') or '1'
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    if method == 'GET':
        query = '''
            SELECT s.* FROM songs s
            INNER JOIN favorites f ON s.id = f.song_id
            WHERE f.user_id = %s
            ORDER BY f.created_at DESC
        '''
        cur.execute(query, (user_id,))
        favorites = cur.fetchall()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'favorites': [dict(song) for song in favorites]
            }, ensure_ascii=False, default=str),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        song_id: int = body_data.get('song_id')
        
        query = 'INSERT INTO favorites (user_id, song_id) VALUES (%s, %s) ON CONFLICT (user_id, song_id) DO NOTHING'
        cur.execute(query, (user_id, song_id))
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Added to favorites'}),
            'isBase64Encoded': False
        }
    
    if method == 'DELETE':
        params = event.get('queryStringParameters') or {}
        song_id: str = params.get('song_id')
        
        query = 'DELETE FROM favorites WHERE user_id = %s AND song_id = %s'
        cur.execute(query, (user_id, song_id))
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Removed from favorites'}),
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
