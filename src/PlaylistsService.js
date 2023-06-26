const { Pool } = require('pg');
class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }
 
  async getPlaylists(userId) {
    console.log(userId);
    
    const query = {
      text: `SELECT playlists.id as playlist_id, playlists.name as playlist_name, users.username , songs.id, songs.title, songs.performer
      FROM playlistsongs 
      INNER JOIN playlists ON playlists.id=playlistsongs.playlist_id
      INNER JOIN songs ON songs.id=playlistsongs.song_id 
      INNER JOIN users ON playlists.owner=users.id 
      WHERE playlists.owner = $1
      GROUP BY playlists.id`,
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}
 
module.exports = PlaylistsService;