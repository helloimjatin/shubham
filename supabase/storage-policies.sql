-- Run in Supabase SQL Editor after creating storage buckets:
-- films, photos, thumbnails

-- Public read access for all buckets
CREATE POLICY "Public read films"
ON storage.objects FOR SELECT
USING (bucket_id = 'films');

CREATE POLICY "Public read photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'photos');

CREATE POLICY "Public read thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'thumbnails');

-- Authenticated users (admin) can upload/update/delete
CREATE POLICY "Auth upload films"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'films');

CREATE POLICY "Auth upload photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Auth upload thumbnails"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'thumbnails');

CREATE POLICY "Auth update storage"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id IN ('films', 'photos', 'thumbnails'));

CREATE POLICY "Auth delete storage"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id IN ('films', 'photos', 'thumbnails'));
