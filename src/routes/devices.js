const express = require("express");
const multer = require("multer");
const router = express.Router();

const deviceService = require("../services/deviceService");
const fileService = require("../services/fileService");

const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * /devices:
 *   post:
 *     summary: Create a new device
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Device created
 *       400:
 *         description: Invalid input
 */
router.post("/", async (req, res) => {
  try {
    const device = await deviceService.createDevice(req.body);
    res.status(201).json(device);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /devices/{id}/files:
 *   post:
 *     summary: Upload file for a device
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Device not found
 */
router.post("/:id/files", upload.single("file"), async (req, res) => {
  try {
    const result = await fileService.uploadFile({
      deviceId: req.params.id,
      file: req.file,
    });

    res.status(201).json(result);
  } catch (err) {
    if (err.message === "Device not found") {
      return res.status(404).json({ error: err.message });
    }

    if (err.message === "File missing") {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Internal error" });
  }
});

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Get all devices
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: List of devices
 */
router.get("/", async (req, res) => {
  try {
    const devices = await deviceService.getAllDevices();
    res.status(200).json(devices);
  } catch (err) {
    res.status(500).json({ error: "Internal error" });
  }
});

module.exports = router;