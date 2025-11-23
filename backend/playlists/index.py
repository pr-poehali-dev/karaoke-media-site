'''
Business: API для управления плейлистами пользователя
Args: event - dict с httpMethod, body, queryStringParameters
      context - объект с атрибутами request_id, function_name
Returns: HTTP response с плейлистами или статусом операции
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
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
        params = event.get('queryStringParameters') or {}
        playlist_id = params.get('id')
        
        if playlist_id:
            query = '''
                SELECT p.*, 
                       json_agg(
                           json_build_object(
                               'id', s.id,
                               'title', s.title,
                               'artist', s.artist,
                               'duration', s.duration,
                               'image_url', s.image_url,
                               'position', ps.position
                           ) ORDER BY ps.position
                       ) FILTER (WHERE s.id IS NOT NULL) as songs
                FROM playlists p
                LEFT JOIN playlist_songs ps ON p.id = ps.playlist_id
                LEFT JOIN songs s ON ps.song_id = s.id
                WHERE p.id = %s AND p.user_id = %s
                GROUP BY p.id
            '''
            cur.execute(query, (playlist_id, user_id))
            playlist = cur.fetchone()
            
            if not playlist:
                cur.close()
                conn.close()
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Playlist not found'}),
                    'isBase64Encoded': False
                }
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(dict(playlist), ensure_ascii=False, default=str),
                'isBase64Encoded': False
            }
        else:
            query = 'SELECT * FROM playlists WHERE user_id = %s ORDER BY created_at DESC'
            cur.execute(query, (user_id,))
            playlists = cur.fetchall()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'playlists': [dict(pl) for pl in playlists]
                }, ensure_ascii=False, default=str),
                'isBase64Encoded': False
            }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        title: str = body_data.get('title')
        description: str = body_data.get('description', '')
        is_public: bool = body_data.get('is_public', True)
        
        query = 'INSERT INTO playlists (user_id, title, description, is_public) VALUES (%s, %s, %s, %s) RETURNING id'
        cur.execute(query, (user_id, title, description, is_public))
        result = cur.fetchone()
        conn.commit()
        
        playlist_id = result['id']
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'id': playlist_id}),
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
