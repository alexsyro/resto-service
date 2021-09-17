const express = require('express');

const { Router } = express;
const router = Router();
const { Position, Subcategory, Category } = require('../db/models');


router.get('/')
